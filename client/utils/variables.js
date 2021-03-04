const CATEOGRY = {
  digital: "디지털/가전",
  kids: "유아동",
  goods: "생활용품",
  clothing: "의류/잡화",
  sports: "스포츠/레저",
  hobby: "도서/취미",
  etc: "기타용품",
};

const TITLEINFO = {
  owner: {
    title: "내가 대여해 준 물품",
    discription:
      "회원님께서 다른 회원님께 회원님의 물건을 빌려 준 경우에 대한 거래 내역입니다",
  },
  borrow: {
    title: "내가 대여한 물품",
    discription:
      "회원님께서 다른 회원님께 회원님의 물건을 대여 한 경우에 대한 거래 내역입니다",
  },
  items: {
    title: "관심 있는 물품",
    discription: "회원님께서 담아 둔 관심 상품 입니다",
  },
  posts: {
    title: "내가 쓴 글 보기",
    discription: "회원님께서 작성하신 게시글 입니다",
  },
  comments: {
    title: "내가 쓴 댓글 보기",
    discription: "회원님께서 작성하신 댓글 입니다",
  },
  info: {
    title: "회원정보 수정",
    discription: "회원님의 정보를 수정할 수 있습니다",
  },
  signout: {
    title: "회원탈퇴",
    discription: "에브리쉐어를 탈퇴하고 회원님의 정보를 삭제 합니다",
  },
};

const MYPAGETYPE = {
  owner: 0,
  borrow: 0,
  posts: 1,
  comments: 1,
  info: 2,
  signout: 3,
  items: 4,
};

const STATE = {
  0: "거래대기",
  1: "거래승인",
  2: "거래완료",
};

export { CATEOGRY, TITLEINFO, MYPAGETYPE, STATE };
