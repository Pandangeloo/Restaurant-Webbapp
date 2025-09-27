//TODO: adminpage should see all bookings-change and cancel booking  and handle tables/times

import AdminBookings from "../parts/AdminBookings";
import AdminTables from "../parts/AdminTables";

AdminPage.route = {
  path: "/admin",
};

export default function AdminPage() {
  return (
    <div>
      <h1>Welcome Admin!</h1>
      <p>
        Here you can see all the bookings, both past and future for now. More
        things coming soon
      </p>
      <AdminBookings />
      <AdminTables />
    </div>
  );
}
