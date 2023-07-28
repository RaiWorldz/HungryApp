export const regexHealthScore = /^(100|[1-9]\d|\d)$/;
export const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i;
export const regexAlphanumeric = /^[a-zA-Z0-9]+$/;

export function isValidHealthScore(healthScore) {
  return regexHealthScore.test(healthScore);
}

export function isValidImageUrl(imageUrl) {
  return regexImageUrl.test(imageUrl);
}

export function isValidTitle(title) {
  return regexAlphanumeric.test(title);
}

export function validateRecipeInput(input) {
  let errors = {};

  if (!input.title) errors.title = 'Please put the title of the recipe';
  else if (!isValidTitle(input.title))
    errors.title = 'Please use only letters and numbers in the title';
  else if (input.title.length > 50)
    errors.title = 'Title cannot be longer than 50 characters';

  if (!input.summary) errors.summary = 'Please put the summary of the recipe';

  if (!isValidHealthScore(input.healthScore))
    errors.healthScore = 'Please put a healthScore between 0-100';

  if (!input.image) errors.image = 'Please add an image to your recipe';
  else if (!isValidImageUrl(input.image))
    errors.image = 'Please enter a valid image URL (jpg, gif, or png)';

  if (!input.typeDiets || input.typeDiets.length === 0)
    errors.typeDiets = 'Please select at least one type of diet for your recipe';

  return errors;
}