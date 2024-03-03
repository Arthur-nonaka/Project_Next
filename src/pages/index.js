import path from "path";
import fs from "fs";

import Link from "next/link";

import classes from "../styles/Home.module.css";

function HomePage(props) {
  const { products } = props;

  return (
    <div className={classes.main}>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={"/" + product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products: data.products },
    revalidate: 10,
  };
}

export default HomePage;
