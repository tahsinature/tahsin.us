import Image from "next/image";
import classes from "./ImageStack.module.scss";
import clsx from "clsx";

const ImageStack = (props: { images: [string, string, string] }) => {
  return (
    <div className={clsx(classes.Holder)}>
      <div className={clsx(classes.StackImage)}>
        <Image src={props.images[0]} height={200} width={200} alt="stack of image" />
      </div>
      <div className={clsx(classes.StackImage)}>
        <Image src={props.images[1]} height={200} width={200} alt="stack of image" />
      </div>
      <div className={clsx(classes.StackImage)}>
        <Image src={props.images[2]} height={200} width={200} alt="stack of image" />
      </div>
    </div>
  );
};

export default ImageStack;
