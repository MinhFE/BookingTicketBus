import i18n from "i18next";

import HOME_EN from "../translation/en/home.json";
import HOME_VI from "../translation/vi/home.json";
import ABOUTUS_EN from "../translation/en/aboutUs.json";
import ABOUTUS_VI from "../translation/vi/aboutUs.json";
import CONTRACT_EN from "../translation/en/contract.json";
import MORERECRUITMENT_EN from "../translation/en/moreRecruitment.json";
import NEWS_EN from "../translation/en/news.json";
import RECRUITMENT_EN from "../translation/en/recruitment.json";
import SCHEDULE_EN from "../translation/en/schedule.json";
import VALIDATE_EN from "../translation/en/validate.json";
import ORDER_EN from "../translation/en/orderHistory.json";
import CONTRACT_VI from "../translation/vi/contract.json";
import MORERECRUITMENT_VI from "../translation/vi/moreRecruitment.json";
import NEWS_VI from "../translation/vi/news.json";
import RECRUITMENT_VI from "../translation/vi/recruitment.json";
import SCHEDULE_VI from "../translation/vi/schedule.json";
import VALIDATE_VI from "../translation/vi/validate.json";
import ORDER_VI from "../translation/vi/orderHistory.json";

import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    home: HOME_EN,
    aboutUs: ABOUTUS_EN,
    contract: CONTRACT_EN,
    moreRecruitment: MORERECRUITMENT_EN,
    news: NEWS_EN,
    recruitment: RECRUITMENT_EN,
    schedule: SCHEDULE_EN,
    validate: VALIDATE_EN,
    order: ORDER_EN,
  },
  vi: {
    home: HOME_VI,
    aboutUs: ABOUTUS_VI,
    contract: CONTRACT_VI,
    moreRecruitment: MORERECRUITMENT_VI,
    news: NEWS_VI,
    recruitment: RECRUITMENT_VI,
    schedule: SCHEDULE_VI,
    validate: VALIDATE_VI,
    order: ORDER_VI,
  },
};

const defaultNS = "home";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: [
    "home",
    "aboutUs",
    "contract",
    "moreRecruitment",
    "news",
    "recruitment",
    "schedule",
    "validate",
    "order",
  ],
  defaultNS,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
