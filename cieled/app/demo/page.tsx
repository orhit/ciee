import CIEComparator from "../components/CIEComparator";

export const metadata = {
  title: "CIE 1931 Comparator | Xuanlabs (Demo)",
};

export default function DemoPage() {
  return <CIEComparator isDemo={true} />;
}
