// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group18IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group18Icon(props: Group18IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 18"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M7.561 17.922a12 12 0 01-2.934-.34c-.914-.228-1.723-.56-2.422-1.001-.697-.442-1.24-.988-1.626-1.636C.193 14.296 0 13.537 0 12.682v-.442h3.543v.325c0 .795.371 1.392 1.106 1.798.742.405 1.746.611 3.016.611.742 0 1.426-.074 2.043-.228.615-.155 1.113-.383 1.477-.7a1.5 1.5 0 00.55-1.201c0-.796-.394-1.357-1.174-1.695-.78-.34-1.968-.634-3.55-.9a22.17 22.17 0 01-2.503-.589 8.757 8.757 0 01-2.168-.95c-.64-.4-1.152-.893-1.523-1.483C.437 6.64.252 5.925.252 5.085c0-1.083.327-2.012.98-2.771C1.888 1.554 2.779.98 3.893.59 5.005.199 6.238 0 7.581 0c1.345 0 2.51.206 3.618.626 1.107.42 2.006 1.017 2.682 1.806.675.788 1.017 1.746 1.017 2.889v.294H11.37v-.228c0-.568-.178-1.024-.541-1.385-.364-.362-.832-.627-1.404-.804a6.185 6.185 0 00-1.827-.272c-.594 0-1.189.066-1.783.191-.594.125-1.092.34-1.485.634a1.457 1.457 0 00-.595 1.216c0 .508.193.936.572 1.245.387.31.93.56 1.627.767.698.199 1.516.383 2.444.545.853.155 1.685.346 2.496.575a9.284 9.284 0 012.19.92c.654.384 1.173.87 1.56 1.467.387.597.58 1.327.58 2.196 0 .87-.209 1.68-.625 2.329a4.966 4.966 0 01-1.7 1.621c-.72.428-1.53.752-2.444.958a13.02 13.02 0 01-2.882.317l.008.015z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group18Icon;
/* prettier-ignore-end */
