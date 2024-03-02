import classes from "./EventItem.module.css";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowIcon from "@/components/icons/arrow-right-icon";

import Button from "../ui/Button";

function EventItem(props) {
  const { id, image, title, date, location } = props;

  const exploreLink = `/events/${id}`;
  const formattedAddress = location.replace(", ", "\n");
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={image} />
      <div className={classes.content}>
        <div className={classes.sumary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}><ArrowIcon/></span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
