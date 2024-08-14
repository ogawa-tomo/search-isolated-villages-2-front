import Image from "next/image";
import localImage from "@/public/shiiba.png";
import { BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { TextLink } from "@/components/TextLink";

export const metadata = {
  title: 'このツールについて',
  description: '秘境集落ツールについて説明するページです。'
}

export default function Page() {
  return (
    <>
      <h1>このツールについて</h1>
      <h2>概要</h2>
      <TextLink href="https" external>
        秘境集落探索ツールを作ったので紹介する
      </TextLink>

      <h2>探索方法</h2>

      <h3>集落の定義</h3>
      <p>
        メッシュ人口データを用い、人口を持つ隣接したメッシュの集合を集落として定義する。<br />
        たとえば下図のような地域があれば、赤丸で示す7集落が定義される。
      </p>

      <Image
        src={localImage}
        alt='village'
      />

      <p className="text-sm">
        ※図の四角はメッシュ、メッシュ内の数字は人口を示している。<br />
        ※メッシュが縦横だけでなく斜めに接している場合も隣接しているとみなす。<br />
        ※人口を持つメッシュが100個より多く隣接している場合は集落とみなさない。
      </p>

      <h3>秘境集落の定義</h3>
      <p>集落の「都会度」を以下の式で定義し、都会度が小さいほど秘境度が高いとみなす。</p>
      <BlockMath
        math="都会度 = \sum_{集落外メッシュ}{人口 \over 距離^2}"
      />
      <p>つまり、より近くにより多くの人口があれば都会であり、その逆であれば秘境である。</p>
      <p className="text-sm">
        ※集落外メッシュとの距離は集落の各メッシュからの距離のうち最短のものを採用する。<br />
        ※計算セグメントを北海道・本州・四国・九州・沖縄の5つにわけ、集落の都会度はセグメント内のメッシュのみを用いて評価する。<br />
        ※本土の都会度計算に離島のメッシュは含めず、離島の都会度計算には本土のメッシュを含んでいる
      </p>

      <h3>秘境施設の定義</h3>
      <p>施設の「都会度」を以下の式で定義し、都会度が小さいほど秘境度が高いとみなす。</p>
      <BlockMath
        math="都会度 = \sum_{施設が含まれないメッシュ}{人口 \over 距離^2}"
      />
      <p className="text-sm">
        ※計算セグメントを北海道・本州・四国・九州・沖縄の5つにわけ、施設の都会度はセグメント内のメッシュのみを用いて評価する。<br />
        ※本土の都会度計算に離島のメッシュは含めず、離島の都会度計算には本土のメッシュを含んでいる
      </p>


      <h3>地域区分</h3>
      地域区分は以下の通り。
      <ul className="list-disc list-inside">
        <li>北海道：北海道</li>
        <li>東北：青森県、秋田県、岩手県、宮城県、山形県、福島県</li>
        <li>関東：東京都、神奈川県、千葉県、埼玉県、群馬県、栃木県、茨城県</li>
        <li>北陸：新潟県、富山県、石川県、福井県</li>
        <li>中部：山梨県、長野県、岐阜県、静岡県、愛知県</li>
        <li>近畿：滋賀県、京都府、大阪県、三重県、奈良県、和歌山県</li>
        <li>中国：岡山県、鳥取県、広島県、島根県、山口県</li>
        <li>九州：福岡県、佐賀県、長崎県、熊本県、大分県、宮崎県、鹿児島県</li>
        <li>沖縄：沖縄県</li>
      </ul>
      本土を北海道・本州・四国・九州・沖縄本島とし、本土と橋で繋がっていない島を離島と定義する。

      <h2>使用データ</h2>
      <p>
        <TextLink href="https://www.e-stat.go.jp/gis/statmap-search?type=1" external>
          政府統計の総合窓口(e-Stat) 2015/2020年度国勢調査5次メッシュ人口データ
        </TextLink>
        <br />
        <span className="text-sm">
          ※国土をおよそ250m四方のメッシュに区切り、それぞれのメッシュに人口が入っているデータ
        </span>
      </p>

      <p>
        <TextLink href="https://www.e-stat.go.jp/gis/statmap-search?type=2" external>
          政府統計の総合窓口(e-Stat) 2015/2020年度国勢調査小地域データ
        </TextLink>
        <br />
        <span className="text-sm">
          ※集落と地名の紐づけに利用
        </span>
      </p>

      <p>
        <TextLink href="http://nlftp.mlit.go.jp/ksj/" external>
          国土交通省国土政策局 国土数値情報
        </TextLink>
      </p>
      <ul className="list-disc list-inside">
        <li>郵便局　※データ作成年度：平成25年度</li>
        <li>学校　※データ作成年度：平成25年度</li>
        <li>鉄道　※データの基準となる年月日：令和元（2019）年12月31日時点</li>
        <li>鉄道時系列　※データ基準年月日：昭和25年1月1日からデータ整備年の12月31日の間に運行していた鉄道路線</li>
        <li>道の駅　※データ作成年度：平成30年度（平成31年1月1日時点）</li>
        <li>ニュータウン　※データ作成年度：平成25年度</li>
        <li>研究機関　※データの基準年月日：平成24（2012）年9月1日時点</li>
      </ul>

      <p>
        <TextLink href="https://gbank.gsj.jp/gres-db/#" external>
          産総研地質調査総合センター　地熱情報データベース
        </TextLink>
      </p>
      <p>
        <TextLink href="http://umap.openstreetmap.fr/ja/map/r774_368811" external>
          R774@まとめ屋さんの訪問先まとめマップ
        </TextLink>
        <br />
        774@まとめ屋さん：<TextLink href="https://twitter.com/kendou774" external>@kendou774</TextLink>
        <br />
        （作者：<TextLink href="http://umap.openstreetmap.fr/ja/user/muramototomoya/" external>muramototomoya</TextLink>さん）
      </p>

      <h2>ソースコード</h2>
      フロントエンド：<TextLink href="https://github.com/ogawa-tomo/search-isolated-villages-2-front" external>https://github.com/ogawa-tomo/search-isolated-villages-2-front</TextLink>
      <br />
      バックエンド：<TextLink href="https://github.com/ogawa-tomo/search-isolated-villages-2" external>https://github.com/ogawa-tomo/search-isolated-villages-2</TextLink>
      <h2>作者</h2>
      <TextLink href="https://twitter.com/otomo6sm" external>@otomo6sm</TextLink>
    </>
  );
}