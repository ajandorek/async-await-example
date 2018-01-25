const users = [{
  id: 1,
  name: 'Alec',
  schoolId: 101
}, {
  id: 2,
  name: 'Joe',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 90
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 1,
  schoolId: 101,
  grade: 95
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to fine user with id of ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  var user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if( grades.length > 0 ) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% average in the class`;
  });
}

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;

    if( grades.length > 0 ) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% average in the class`;
};

getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

// getStatus(2).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
