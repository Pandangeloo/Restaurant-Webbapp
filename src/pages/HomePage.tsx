import Image from "../parts/Image";
import { Carousel, Container, Row, Col } from "../index";

HomePage.route = {
  path: "/",
};
export default function HomePage() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            src="/images/homepageimgs/salmon.jpg"
            alt="Fresh salmon with lemon"
          />
          <Carousel.Caption>
            <h3>Fresh Salmon with Love</h3>
            <p>
              A true classic – tender salmon served with fresh sides and a hint
              of lemon.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="/images/homepageimgs/veggiepan.jpg"
            alt="Vegan pan with bell peppers adn vegetables"
          />
          <Carousel.Caption>
            <h3>Colorful Veggie Delight</h3>
            <p>
              A vibrant vegan pan with bell peppers and the best vegetables of
              the season.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="/images/homepageimgs/ingredients.jpg"
            alt="Different kind of fresh ingredients on a table"
          />
          <Carousel.Caption>
            <h3>It All Starts with Ingredients</h3>
            <p>
              Carefully selected produce – because every dish should taste as
              good as it looks.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="my-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="text-center">
            <h2 className="mb-4">Discover the Taste of The Axolotl</h2>
            <p className="lead">
              Welcome to The Axolotl, a unique dining experience inspired by
              creativity, freshness, and a touch of the unexpected.
            </p>
            <p>
              Just as the axolotl is known as the "walking fish" that never
              truly grows up, we bring a youthful curiosity and playful spirit
              into every dish we create.
            </p>
            <p>
              From vibrant vegetarian pans to our signature salmon plate, our
              menu celebrates the beauty of carefully chosen ingredients and
              bold flavors.
            </p>
            <p>
              Join us for an evening where food is more than a meal – it’s an
              experience as rare and memorable as the axolotl itself.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
