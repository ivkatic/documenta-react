import React, { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Article = (props) => {
  let url = props.item.url.replace(env.SITE_URL, "");
  let catLocale = "kategorija";
  const locale = props.locale;
  if (typeof locale !== "undefined" && locale != "" && locale != null) {
    catLocale = "en/category";
  }

  return (
    <article className="md:flex mb-8 md:mb-16" key={props.item.id}>
      {props.item.thumb != "" && (
        <div className="md:w-5/12 md:mr-8 text-center">
          <Link to={{ pathname: url }}>
            <img src={props.item.thumb} className="inline-block" />
          </Link>
        </div>
      )}

      <div className="md:w-7/12 p-6 md:p-0 md:pr-8">
        <div className="cats">
          {props.item.cats.length > 0 &&
            props.item.cats.map((catitem, i) => {
              return (
                <Link
                  to={{ pathname: `/${catLocale}/` + catitem.slug }}
                  className="cat inline-block"
                  key={i}
                >
                  {catitem.name}
                </Link>
              );
            })}
        </div>
        <h4>
          <Link to={{ pathname: url }}>{props.item.title}</Link>
        </h4>
        <div className="content">
          {props.item.excerpt}{" "}
          <Link
            to={{ pathname: `/${catLocale}/${props.item.slug}` }}
            className="read-more"
          >
            Read more
          </Link>
        </div>
        <time>{props.item.date}</time>
      </div>
    </article>
  );
};

export default Article;
