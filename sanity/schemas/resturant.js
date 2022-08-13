export default {
  name: "restaurant",
  title: "Resturant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the restaurant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Resturant Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a rating from (1-5 Stars)",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5"),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};
