import OrdersList from "./OrderList";
import DeliveriesList from "./DeliveriesList";

export default function CombinedView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <OrdersList />
      <DeliveriesList />
    </div>
  );
}
