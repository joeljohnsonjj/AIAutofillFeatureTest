import * as allure from "allure-js-commons";

export function sendValues(description, displayName, severity) {
    allure.description(description);
    allure.displayName(displayName);
    allure.severity(severity);
}