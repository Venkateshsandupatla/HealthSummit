// test/utils.test.js
const assert = require("assert");
const { isValidEmail } = require("../utils");

describe("Email Validation Function", () => {
    it("should return true for valid email addresses", () => {
        assert.strictEqual(isValidEmail("test@example.com"), true);
        assert.strictEqual(isValidEmail("user.name@domain.co"), true);
    });

    it("should return false for invalid email addresses", () => {
        assert.strictEqual(isValidEmail("invalid-email"), false);
        assert.strictEqual(isValidEmail("user@domain"), false);
        assert.strictEqual(isValidEmail("user@.com"), false);
    });
});
