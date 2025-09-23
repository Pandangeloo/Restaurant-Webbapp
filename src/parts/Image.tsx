export default function Image(props: any) {
  props = { ...props };
  props.className =
    (props.className || "") +
    " img-fluid w-100 border border-1 border-primary rounded mb-3";

  return <img {...props} />;
}
