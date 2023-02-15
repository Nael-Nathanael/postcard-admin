import React from "react";

export default function PostcardMain({
                                       children,
                                       title
                                     }: {
  children: React.ReactNode,
  title: string
}) {
  return <div className={"pb-3"}>
    <h1 className="h3 top-0 position-sticky bg-white py-3 border mb-3" style={{
      zIndex: 1000
    }}>
      <div className="container">
        {title}
      </div>
    </h1>
    <div className="container">
      {children}
    </div>
  </div>
}