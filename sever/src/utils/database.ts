import { generateRegex } from ".";

export const generateMongoQuery = (body: {
  pageSize: number;
  current: number;
  search: any;
  order?: "ascend" | "descend";
  field?: string;
  searchColumn: string[];
}): {
  find: any;
  sort: any;
  limit: number;
  skip: number;
} => {
  let find: {
    [key: string]: any
  } = {};
  const OR = [];
  const AND = [];
  if (body.search?.keyword) {
    for(const column of body.searchColumn) {
      OR.push({
        [column]: {
          $regex: generateRegex(body.search.keyword)
        }
      });
    }
  }
  if (body.search) {
    for(const column of Object.keys(body.search)) {
      if (column != 'keyword') {
        const value = body.search[column];
        if (value) {
          AND.push({
            [column]: {
              $in: value
            }
          })
        }
      }
    }
  }
  if (OR.length > 0) {
    find = {
      ...find,
      $or: OR
    }
  }
  if (AND.length > 0) {
    find = {
      ...find,
      $and: AND
    }
  }
  return {
    find,
    sort: body.field && body.order ? {
      [body.field]: body.order === 'ascend' ? 1 : -1
    }: undefined,
    limit: body.pageSize,
    skip: (body.current - 1) * body.pageSize
  }
}