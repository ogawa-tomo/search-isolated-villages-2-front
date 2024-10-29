import Image from "next/image";
import localImage from "@/public/shiiba.png";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { TextLink } from "@/components/TextLink";
import { ReactNode } from "react";

export const metadata = {
  title: "このツールについて",
  description: "秘境集落探索ツールについて説明するページです。",
};

export default function Page() {
  return (
    <>
      <H1>このツールについて</H1>

      <H2>概要</H2>
      <P>
        秘境集落もしくは秘境施設を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。
      </P>
      <P>
        詳しい紹介は下記のnote記事を参照。
        <br />
        <TextLink href="https" external>
          秘境集落探索ツールを作ったので紹介する
        </TextLink>
      </P>

      <H2>探索方法</H2>

      <H3>集落の定義</H3>
      <P>
        メッシュ人口データを用い、人口を持つ隣接したメッシュの集合を集落として定義する。
        <br />
        たとえば下図のような地域があれば、赤丸で示す7集落が定義される。
      </P>
      <P>
        <Image src={localImage} alt="village" />
      </P>
      <P>
        <Annotation>
          ※図の四角はメッシュ、メッシュ内の数字は人口を示している。
          <br />
          ※メッシュが縦横だけでなく斜めに接している場合も隣接しているとみなす。
          <br />
          ※人口を持つメッシュが100個より多く隣接している場合は集落とみなさない。
        </Annotation>
      </P>

      <H3>集落の秘境度の定義</H3>
      <P>
        集落
        <InlineMath math="v" />
        の「都会度」
        <InlineMath math="U(v)" />
        を以下の式で定義し、都会度が小さいほど集落の秘境度が高いとみなす。
      </P>
      <BlockMath math="U(v) = \sum_{m \notin v}{p(m) \over d(v, m)^2}" />
      <div className="text-center">
        <Annotation>
          <InlineMath math="m \notin v" />: 集落
          <InlineMath math="v" />
          に含まれない人口メッシュ
          <InlineMath math="m" />
          全体の集合
          <br />
          <InlineMath math="p(m)" />: 人口メッシュ
          <InlineMath math="m" />
          の人口
          <br />
          <InlineMath math="d(v, m)" />: 集落
          <InlineMath math="v" />
          と人口メッシュ
          <InlineMath math="m" />
          の距離
        </Annotation>
      </div>
      <P>
        つまり、より近くにより多くの人口があれば都会であり、その逆であれば秘境である。
      </P>
      <P>
        <Annotation>
          ※集落外メッシュとの距離は集落の各メッシュからの距離のうち最短のものを採用する。
          <br />
          ※計算セグメントを北海道・本州・四国・九州・沖縄の5つにわけ、集落の都会度はセグメント内のメッシュのみを用いて評価する。
          <br />
          ※本土の都会度計算に離島のメッシュは含めず、離島の都会度計算には本土のメッシュを含んでいる
        </Annotation>
      </P>

      <H3>施設の秘境度の定義</H3>
      <P>
        施設
        <InlineMath math="f" />
        の「都会度」
        <InlineMath math="U(f)" />
        を以下の式で定義し、都会度が小さいほど秘境度が高いとみなす。
      </P>
      <BlockMath math="U(f) = \sum_{m \neq m(f) }{p(m) \over d(f, m)^2}" />
      <div className="text-center">
        <Annotation>
          <InlineMath math="m(f)" />: 施設
          <InlineMath math="f" />
          を含む人口メッシュ
          <br />
          <InlineMath math="m \neq m(f)" />: <InlineMath math="m(f)" />
          を除く人口メッシュ
          <InlineMath math="m" />
          全体の集合
          <br />
          <InlineMath math="p(m)" />: 人口メッシュ
          <InlineMath math="m" />
          の人口
          <br />
          <InlineMath math="d(v, m)" />: 集落
          <InlineMath math="v" />
          と人口メッシュ
          <InlineMath math="m" />
          の距離
        </Annotation>
      </div>
      <P>
        <Annotation>
          ※計算セグメントを北海道・本州・四国・九州・沖縄の5つにわけ、施設の都会度はセグメント内のメッシュのみを用いて評価する。
          <br />
          ※本土の都会度計算に離島のメッシュは含めず、離島の都会度計算には本土のメッシュを含んでいる
        </Annotation>
      </P>

      <H3>地域区分</H3>
      <P>地域区分は以下の通り。</P>
      <UL>
        <li>北海道：北海道</li>
        <li>東北：青森県、秋田県、岩手県、宮城県、山形県、福島県</li>
        <li>関東：東京都、神奈川県、千葉県、埼玉県、群馬県、栃木県、茨城県</li>
        <li>北陸：新潟県、富山県、石川県、福井県</li>
        <li>中部：山梨県、長野県、岐阜県、静岡県、愛知県</li>
        <li>近畿：滋賀県、京都府、大阪県、三重県、奈良県、和歌山県</li>
        <li>中国：岡山県、鳥取県、広島県、島根県、山口県</li>
        <li>九州：福岡県、佐賀県、長崎県、熊本県、大分県、宮崎県、鹿児島県</li>
        <li>沖縄：沖縄県</li>
      </UL>
      <P>
        本土を北海道・本州・四国・九州・沖縄本島とし、本土と橋で繋がっていない島を離島と定義する。
      </P>

      <H2>使用データ</H2>
      <P>
        <TextLink
          href="https://www.e-stat.go.jp/gis/statmap-search?type=1"
          external
        >
          政府統計の総合窓口(e-Stat) 2015/2020年度国勢調査5次メッシュ人口データ
        </TextLink>
        <br />
        <Annotation>
          ※国土をおよそ250m四方のメッシュに区切り、それぞれのメッシュに人口が入っているデータ
        </Annotation>
      </P>
      <P>
        <TextLink
          href="https://www.e-stat.go.jp/gis/statmap-search?type=2"
          external
        >
          政府統計の総合窓口(e-Stat) 2015/2020年度国勢調査小地域データ
        </TextLink>
        <br />
        <Annotation>※集落と地名の紐づけに利用</Annotation>
      </P>
      <P>
        <TextLink href="http://nlftp.mlit.go.jp/ksj/" external>
          国土交通省国土政策局 国土数値情報
        </TextLink>
      </P>
      <UL>
        <li>
          郵便局 <Annotation>※データ作成年度: 平成25年度</Annotation>
        </li>
        <li>
          学校 <Annotation>※データ作成年度: 平成25年度</Annotation>
        </li>
        <li>
          鉄道{" "}
          <Annotation>
            ※データの基準となる年月日: 令和元（2019）年12月31日時点
          </Annotation>
        </li>
        <li>
          鉄道時系列{" "}
          <Annotation>
            ※データ基準年月日:
            昭和25年1月1日からデータ整備年の12月31日の間に運行していた鉄道路線
          </Annotation>
        </li>
        <li>
          道の駅{" "}
          <Annotation>
            ※データ作成年度: 平成30年度（平成31年1月1日時点）
          </Annotation>
        </li>
        <li>
          ニュータウン <Annotation>※データ作成年度: 平成25年度</Annotation>
        </li>
        <li>
          研究機関{" "}
          <Annotation>
            ※データの基準年月日: 平成24（2012）年9月1日時点
          </Annotation>
        </li>
      </UL>
      <P>
        <TextLink href="https://gbank.gsj.jp/gres-db/#" external>
          産総研地質調査総合センター　地熱情報データベース
        </TextLink>
      </P>
      <P>
        <TextLink
          href="http://umap.openstreetmap.fr/ja/map/r774_368811"
          external
        >
          R774@まとめ屋さんの訪問先まとめマップ
        </TextLink>
        <br />
        774@まとめ屋さん：
        <TextLink href="https://twitter.com/kendou774" external>
          @kendou774
        </TextLink>
        <br />
        （作者：
        <TextLink
          href="http://umap.openstreetmap.fr/ja/user/muramototomoya/"
          external
        >
          muramototomoya
        </TextLink>
        さん）
      </P>

      <H2>ソースコード</H2>
      <P>
        <UL>
          <li>
            フロントエンド：
            <TextLink
              href="https://github.com/ogawa-tomo/search-isolated-villages-2-front"
              external
            >
              https://github.com/ogawa-tomo/search-isolated-villages-2-front
            </TextLink>
          </li>
          <li>
            バックエンド：
            <TextLink
              href="https://github.com/ogawa-tomo/search-isolated-villages-2"
              external
            >
              https://github.com/ogawa-tomo/search-isolated-villages-2
            </TextLink>
          </li>
        </UL>
      </P>
      <H2>作者</H2>
      <P>
        <TextLink href="https://twitter.com/otomo6sm" external>
          @otomo6sm
        </TextLink>
      </P>
    </>
  );
}

const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="mb-6 text-3xl font-bold">{children}</h1>;
};

const H2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="my-4 border-b-2 pb-2 text-2xl font-bold">{children}</h2>
  );
};

const H3 = ({ children }: { children: ReactNode }) => {
  return <h3 className="my-4 text-xl font-bold">{children}</h3>;
};

const P = ({ children }: { children: ReactNode }) => {
  return <p className="my-4 leading-relaxed">{children}</p>;
};

const Annotation = ({ children }: { children: ReactNode }) => {
  return <span className="text-sm">{children}</span>;
};

const UL = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="my-4 ml-5 list-outside list-disc leading-relaxed">
      {children}
    </ul>
  );
};
