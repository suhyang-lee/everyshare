/* 페이지 공통 풋터  */
import React from "react";
import Link from "next/link";
import styled from "styled-components";

const FooterLink = styled.a`
  color: white;
  cursor: pointer;
`;

/* CSS 모듈 import */
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <nav className={styles.footerNav}>
          {/* <!-- 카테고리 메뉴 --> */}
          <ul className={styles.footerItem}>
            <li>
              <h3>CATEGORY</h3>
            </li>

            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/digital",
                  }}
                >
                  <FooterLink>디지털/가전</FooterLink>
                </Link>
              </h4>
            </li>

            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/kids",
                  }}
                >
                  <FooterLink>유아동</FooterLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/goods",
                  }}
                >
                  <FooterLink>생활용품</FooterLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/clothing",
                  }}
                >
                  <FooterLink>의류/잡화</FooterLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/sports",
                  }}
                >
                  <FooterLink>스포츠/레저</FooterLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/hobby",
                  }}
                >
                  <FooterLink>도서/취미</FooterLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/etc",
                  }}
                >
                  <FooterLink>기타용품</FooterLink>
                </Link>
              </h4>
            </li>
          </ul>

          {/* <!-- 고객서비스 메뉴 --> */}
          <ul className={styles.footerItem}>
            <li>
              <h3>CUSTOMER CENTER</h3>
            </li>
            <li>
              <h4>1010-0000</h4>
            </li>
            <li>
              <p>평일 09:00 - 16:00</p>
              <p>점심 12:00 - 14:00</p>
              <p>토/일요일 및 공휴일은 휴무</p>
            </li>
          </ul>

          {/* <!-- 에브리쉐어에 대해 메뉴 --> */}
          <ul className={styles.footerItem}>
            <li>
              <h3>ABOUT EVERYSHARE</h3>
            </li>
            <li>에브리쉐어에 대해</li>
          </ul>

          {/* <!-- 소셜 서비스 메뉴 --> */}
          <ul className={styles.footerItem}>
            <li>
              <h3>SOCIAL SERVICE</h3>
            </li>
            <li className={styles.linkSns}>
              <img src="/images/icon-twitter.svg" alt="트위터 바로가기" />
            </li>
            <li className={styles.linkSns}>
              <img src="/images/icon-facebook.svg" alt="페이스북 바로가기" />
            </li>
            <li className={styles.linkSns}>
              <img src="/images/icon-youtube.svg" alt="유튜브 바로가기" />
            </li>
            <li className={styles.linkSns}>
              <img src="/images/icon-instagram.svg" alt="인스타그램 바로가기" />
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footerCopyWrapper}>
        <div className={styles.footerCopy}>
          <p>Born In KOREA</p>
          <div className={styles.githubInfo}>
            <p>
              https://github.com/suhyang-lee <br /> alzmzl1012@gmail.com
            </p>
            <span>
              {" "}
              <img
                src="/images/img-git-profile.png"
                alt="깃허브 프로필 이미지"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
