import React from "react";
import HomePageHeaderLayout from "../../components/HomePageHeaderLayout";

export default function Layout(props: { children: React.ReactNode }): React.ReactNode {
  return (
    <HomePageHeaderLayout portalHeader="Teaching Faculty Portal">
      {props.children}
    </HomePageHeaderLayout>
  )
}