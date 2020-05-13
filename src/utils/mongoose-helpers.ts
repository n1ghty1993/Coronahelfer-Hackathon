export const createQuery = query => {
  const fieldsToExclude = ['select', 'sort', 'page', 'limit'];

  const clonedQuery = { ...query };

  for (const field of fieldsToExclude) {
    delete clonedQuery[field];
  }

  return clonedQuery;
};

export const createProjection = query => {
  return query.select ? query.select.split(',').join(' ') : '';
};

export const createListOptions = query => {
  const sort = query.sort ? query.sort.split(',').join(' ') : '-createdAt';
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 25;
  const skip = (page - 1) * limit;

  return { sort, skip, limit };
};
