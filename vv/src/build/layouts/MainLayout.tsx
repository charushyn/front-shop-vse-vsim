import { Header , Footer} from "@/widgets/index";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <Header></Header>
        {children}
        <Footer></Footer>
      </>
    );
  }