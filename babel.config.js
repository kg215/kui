module.exports = function (api) {
    api.cache(true);
    return {
        presets: [["@babel/preset-env",{
            useBuiltIns:"usage"
        }], "@babel/preset-react","@babel/preset-typescript"],
        plugins: [
            ["@babel/plugin-proposal-decorators", {legacy: true}],
            ["@babel/plugin-proposal-class-properties"],
            ["@babel/plugin-syntax-dynamic-import"],
            ["@babel/plugin-proposal-optional-chaining"],
            "lodash"
        ],
        retainLines: true
    };
};