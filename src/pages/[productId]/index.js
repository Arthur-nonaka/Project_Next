import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function DetailProductPage(props) {
  const { loadedProduct } = props;

  //   if (!loadedProduct) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;

  const data = await getData();

  const product = data.products.find((x) => x.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
    // \/ ele bloqueia o parametro de enviar antes de carregar completo, ent nao precisa fazer o if pra ver se existe
    //fallback: 'blocking'
  };
}

export default DetailProductPage;
