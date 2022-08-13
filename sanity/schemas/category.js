export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Cateogry Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image of Cateogry",
      type: "image",
    },
  ],
};
