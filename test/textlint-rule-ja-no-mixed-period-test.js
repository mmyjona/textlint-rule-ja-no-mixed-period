const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
import rule from "../src/textlint-rule-ja-no-mixed-period";
tester.run("textlint-rule-ja-no-mixed-period", rule, {
    valid: [
        "これは問題ないです。",
        "1行目。\n2行目。\n3行目。",
        "1行目。  \nHard Breakを入れるパターン。",
        "1行目  空白はあるけど末尾に句点はある。",
        // 感嘆符などが末尾にある場合は問題なし
        "末尾に句点はある!"
    ],
    invalid: [
        // single match
        {
            text: "これは句点がありません",
            output: "これは句点がありません。",
            errors: [
                {
                    message: `文末が"。"で終わっていません。`,
                    line: 1,
                    column: 11
                }
            ]
        },
        // multiple match in multiple lines
        {
            text: "これは句点がありません\n\nこれは句点がありません",
            output: "これは句点がありません。\n\nこれは句点がありません。",
            errors: [
                {
                    message: `文末が"。"で終わっていません。`,
                    line: 1,
                    column: 11
                },
                {
                    message: `文末が"。"で終わっていません。`,
                    line: 3,
                    column: 11
                }
            ]
        },
        // multiple hit items in a line
        {
            text: "これは句点がありません、これは句点がありません",
            output: "これは句点がありません、これは句点がありません。",
            errors: [
                {
                    message: `文末が"。"で終わっていません。`,
                    line: 1,
                    column: 23
                }
            ]
        },
        // options
        {
            text: "This is error",
            output: "This is error.",
            options: {
                periodMark: "."
            },
            errors: [
                {
                    message: `文末が"."で終わっていません。`,
                    line: 1,
                    column: 13
                }
            ]
        }
    ]
});