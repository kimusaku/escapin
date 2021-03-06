import { DynamoDB } from 'aws-sdk';
const _store = {
  foo,
  bar,
};

const _temp = new DynamoDB().putItem({
  TableName: 'store-test',
  Item: {
    key: {
      S: id,
    },
    type: {
      S: typeof _store,
    },
    value: {
      S:
        typeof _store === 'object' || typeof _store === 'function'
          ? JSON.stringify(_store)
          : _store,
    },
  },
});

const _temp2 = new DynamoDB().getItem({
  TableName: 'store-test',
  Key: {
    key: {
      S: id2,
    },
  },
});

let _store2;

if (_temp2 === null || _temp2.Item === undefined) {
  _store2 = undefined;
} else {
  _store2 =
    _temp2.Item.type.S === 'object' || _temp2.Item.type.S === 'function'
      ? JSON.parse(_temp2.Item.value.S)
      : _temp2.Item.value.S;
}

const foo = _store2;

const _temp3 = new DynamoDB().deleteItem({
  TableName: 'store-test',
  Key: {
    key: {
      S: id3,
    },
  },
});

const _store3 = [];

while (true) {
  const params = {
    TableName: 'store-test',
    ExpressionAttributeNames: {
      '#ky': 'key',
    },
    ProjectionExpression: '#ky',
  };
  const _temp4 = new DynamoDB().scan(params);

  _store3.push(..._temp4.Items.map(item => item.key.S));

  if (_temp4.LastEvaluatedKey === undefined) {
    break;
  }

  params.ExclusiveStartKey = _temp4.LastEvaluatedKey;
}

for (const key of _store3) {
  const _temp5 = new DynamoDB().getItem({
    TableName: 'store-test',
    Key: {
      key: {
        S: key,
      },
    },
  });

  let _store4;

  if (_temp5 === null || _temp5.Item === undefined) {
    _store4 = undefined;
  } else {
    _store4 =
      _temp5.Item.type.S === 'object' || _temp5.Item.type.S === 'function'
        ? JSON.parse(_temp5.Item.value.S)
        : _temp5.Item.value.S;
  }

  const bar = _store4;
}
