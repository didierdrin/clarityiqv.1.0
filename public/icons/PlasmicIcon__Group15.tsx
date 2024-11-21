// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group15IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group15Icon(props: Group15IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 18 18"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M6.58 17.915c-1.314 0-2.465-.207-3.453-.62-.988-.412-1.76-1.002-2.303-1.776C.274 14.747 0 13.826 0 12.735c0-1.164.312-2.122.928-2.881.617-.76 1.471-1.349 2.563-1.769 1.092-.42 2.324-.693 3.72-.825 2.066-.207 3.529-.406 4.376-.605.846-.199 1.27-.515 1.27-.958v-.03c0-.876-.38-1.547-1.137-2.004-.758-.456-1.834-.685-3.23-.685-1.479 0-2.622.258-3.425.774-.802.516-1.203 1.334-1.203 2.454H.364c0-1.327.349-2.447 1.04-3.375C2.094 1.909 3.06 1.2 4.285.722 5.511.236 6.915 0 8.505 0c1.455 0 2.785.221 3.98.656 1.196.442 2.154 1.09 2.868 1.96.713.87 1.069 1.953 1.069 3.243v8.253c0 .398.015.788.052 1.164.037.376.096.708.178 1.003.096.339.215.611.35.832.14.221.252.369.341.457h-3.55a2.507 2.507 0 01-.29-.413 3.814 3.814 0 01-.334-.744 4.943 4.943 0 01-.224-.936 8.06 8.06 0 01-.074-1.15l.662.458c-.327.633-.825 1.179-1.486 1.643-.661.464-1.456.833-2.384 1.09-.921.259-1.953.391-3.074.391l-.008.008zm.743-2.933c1.018 0 1.946-.162 2.778-.48.84-.316 1.508-.81 2.013-1.466.505-.656.757-1.489.757-2.483V7.686l.84 1.09c-.698.273-1.56.494-2.57.657-1.01.17-2.05.309-3.127.412-1.478.133-2.585.383-3.335.76-.75.375-1.114.994-1.114 1.864 0 .87.312 1.459.928 1.879.617.42 1.56.626 2.83.626v.008z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group15Icon;
/* prettier-ignore-end */
