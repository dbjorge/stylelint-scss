import { messages, ruleName } from "..";

testRule({
  ruleName,
  config: [true],
  customSyntax: "postcss-scss",

  accept: [
    {
      code: `
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in $font-weights {}
      `,
      description: "Proper map loop that gets both keys + values"
    },
    {
      code: `
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when using global function"
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map.keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with default namespace"
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with default namespace but using global function"
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with no namespace"
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with no namespace but using global function"
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in ns.keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with custom namespace"
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {}
      `,
      description:
        "Loop that just gets keys + has no need for values when loading sass module with custom namespace but using global function"
    },
    {
      code: `
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in map-keys($font-weights) {
         $value: map-get($other-weights, $key);
        }
      `,
      description:
        "map-get pattern used with different hash than loop when using global function"
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in map.keys($font-weights) {
         $value: map.get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with default namespace"
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in map-keys($font-weights) {
         $value: map-get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with default namespace but using global function"
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in keys($font-weights) {
         $value: get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with no namespace"
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in map-keys($font-weights) {
         $value: map-get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with no namespace but using global function"
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in ns.keys($font-weights) {
         $value: ns.get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with custom namespace"
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        $other-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key, $value in map-keys($font-weights) {
         $value: map-get($other-weights, $key);
        }
      `,
      description:
        "map.get pattern used with different hash than loop when loading sass module with custom namespace but using global function"
    }
  ],

  reject: [
    {
      code: `
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {
          $value: map-get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when using global function",
      message: messages.expected,
      line: 3
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map.keys($font-weights) {
          $value: map.get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with default namespace",
      message: messages.expected,
      line: 4
    },
    {
      code: `
        @use "sass:map";
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {
          $value: map-get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with default namespace but using global function",
      message: messages.expected,
      line: 4
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in keys($font-weights) {
          $value: get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with no namespace",
      message: messages.expected,
      line: 4
    },
    {
      code: `
        @use "sass:map" as *;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {
          $value: map-get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with no namespace but using global function",
      message: messages.expected,
      line: 4
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in ns.keys($font-weights) {
          $value: ns.get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with custom namespace",
      message: messages.expected,
      line: 4
    },
    {
      code: `
        @use "sass:map" as ns;
        $font-weights: ("regular": 400, "medium": 500, "bold": 700);
        @each $key in map-keys($font-weights) {
          $value: map-get($font-weights, $key);
        }
      `,
      description:
        "Loop that gets keys + then grabs values inside the map when loading sass module with custom namespace but using global function",
      message: messages.expected,
      line: 4
    }
  ]
});
