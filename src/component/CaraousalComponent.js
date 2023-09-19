import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CaraousalComponent() {
  return (
    <div>
      <Carousel swipeable={true} autoPlay={true} showArrows={true}>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/GW/MFD/Sep/9._CB577858115_.jpg" />

        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/2023/GateWay/September/Unrec/TE_PC._CB577849301_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg" />

        </div>
      </Carousel>
    </div>
  );
}
