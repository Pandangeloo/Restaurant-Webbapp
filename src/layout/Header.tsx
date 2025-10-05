import {
  useState,
  Link,
  useLocation,
  useNavigate,
  Container,
  Nav,
  Navbar,
  Button,
} from "../index";
import { useAuth } from "../features/auth/useAuth";
import routes from "../routes";

export default function Header() {
  // whether the navbar is expanded or not
  // (we use this to close it after a click/selection)
  const [expanded, setExpanded] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  //  get the current route
  const pathName = useLocation().pathname;
  const currentRoute = routes
    .slice()
    .sort((a, b) => (a.path.length > b.path.length ? -1 : 1))
    .find((x) => pathName.indexOf(x.path.split(":")[0]) === 0);
  // function that returns true if a menu item is 'active'
  const isActive = (path: string) =>
    path === currentRoute?.path || path === currentRoute?.parent;

  return (
    <header>
      <Navbar
        expanded={expanded}
        expand="md"
        className="bg-primary"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand className="me-5" as={Link} to="/">
            The Axolotl
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {routes
                .filter((x) => {
                  if (!x.menuLabel) return false;
                  if (x.allowedRoles) {
                    if (x.allowedRoles.includes("visitor")) {
                      return !user;
                    }
                    return user ? x.allowedRoles.includes(user.role) : false;
                  }
                  return true;
                })
                .map(({ menuLabel, path }, i) => (
                  <Nav.Link
                    as={Link}
                    key={i}
                    to={path}
                    className={isActive(path) ? "active" : ""}
                    /* close menu after selection*/
                    onClick={() => setTimeout(() => setExpanded(false), 200)}
                  >
                    {menuLabel}
                  </Nav.Link>
                ))}
            </Nav>
            {user && (
              <Nav>
                <Navbar.Text className="me-2">
                  Signed in as: <strong>{user.firstName}</strong>
                </Navbar.Text>                
                <Button
                  variant="outline-light"
                  onClick={async () => {
                    navigate("/");
                    await logout();
                    setExpanded(false);
                  }}
                >
                  Log out
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
