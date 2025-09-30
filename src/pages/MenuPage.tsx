import { Col, Row } from "../index";

MenuPage.route = {
  path: "/menu",
  menuLabel: "Menu",
  index: 2,
};

export default function MenuPage() {
  return (
    <>
      <Row>
        <Col>
          <img
            src="/images/Menu.png"
            alt="The Axolotl Menu"
            className="menu-image"
          />
        </Col>
      </Row>
    </>
  );
}
