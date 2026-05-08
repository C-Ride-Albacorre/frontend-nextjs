import { CartInitializer } from "@/helpers/cart-initializer";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
     

      <div className="container">{children}</div>
    </div>
  );
}
