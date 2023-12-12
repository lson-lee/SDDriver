export const postRequest = async (path, data) => {
  const res = await fetch(`http://home.lsonlee.top:59123${path}`, {
    method: 'POST',
    mode: "cors",
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  })
  return res.json();
}

export const getRequest = async (path, data) => {
  const res = await fetch(`http://home.lsonlee.top:59123${path}`, {
    method: 'GET',
    mode: "cors",
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  })
  return res.json();
}
