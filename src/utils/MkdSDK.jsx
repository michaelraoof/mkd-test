export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (email, password, role) {
    fetch("https://reacttask.mkdlabs.com/v2/api/lambda/login", {
      method: "post",

      headers: {
        "Content-Type": "application/json",
        "x-project": "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
      });
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(this._baseurl + `/v1/api/rest/${this._table}/GET`, {
          method: "post",
          headers: header,
          body: JSON.stringify(payload),
        });
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(this._baseurl + `/v1/api/rest/${this._table}/${method}`, {
          method: "post",
          headers: header,
          body: JSON.stringify(payload),
        });
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
    fetch("https://reacttask.mkdlabs.com/v2/api/lambda/check", {
      method: "post",

      headers: {
        "Content-Type": "application/json",
        "x-project": "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({
        role: role,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("in check");
        console.log(data);
      });
  };

  return this;
}
