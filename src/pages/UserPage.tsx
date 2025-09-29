import ProtectedRoute from "../parts/ProtectedRoute";

UserPage.route = {
  path: "/user",
  element: (
    <ProtectedRoute requiredRole="user">
      <UserPage />
    </ProtectedRoute>
  ),
  menuLabel: "My pages",
  index: 7,
  allowedRoles: ["user"],
};

export default function UserPage() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        Here you can see all the bookings, both past and future for now. More
        things coming soon
      </p>
    </div>
  );
}