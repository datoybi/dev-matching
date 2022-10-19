import classes from "./Cart.module.css";

const Cart = () => {
  return (
    <div class={classes.Cart}>
      <ul>
        <li class={classes.Cart__item}>
          <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
          <div class={classes.Cart__itemDesription}>
            <div>커피잔 100개 번들 10,000원 10개</div>
            <div>100,000원</div>
          </div>
        </li>
        <li class={classes.Cart__item}>
          <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
          <div class={classes.Cart__itemDesription}>
            <div>커피잔 1000개 번들 15,000원 5개</div>
            <div>75,000원</div>
          </div>
        </li>
      </ul>
      <div class={classes.Cart__itemDesription}>총 상품가격 175,000원</div>
      <button class={classes.OrderButton}>주문하기</button>
    </div>
  );
};

export default Cart;
