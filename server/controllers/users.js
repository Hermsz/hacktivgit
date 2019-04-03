const axios = require('axios');

let ax = axios.create({
  baseURL: 'https://api.github.com'
});

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;


class UserController {

  // GET ALL REPOS -----
  static getRepos(req, res) {
    ax
      .get('/user/repos')
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // CREATE NEW REPO ----
  static createRepo(req, res) {
    ax
      .post('/user/repos', {
        name: req.body.repoName
      })
      .then(({ data }) => {
        console.log(data)
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // DELETE REPO ---
  static deleteRepo(req, res) {
    ax
      .delete(`/repos/${req.params.owner}/${req.params.repoName}`)
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // GET STARRED REPO AND SEARCH STARRED REPO 
  // static getStarredRepo(req, res) {
  //   ax
  //     .get(`/users/${req.params.username}/starred`)
  //     .then(({ data }) => {
  //       if(req.body.repoName) {
  //         data.forEach(repo => {
  //           if(repo.name == req.body.repoName) {
  //             res.status(200).json(repo)
  //           } 
  //         })
  //       } else {
  //         res.status(200).json(data)
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).json(err.message)
  //     })
  // }

  // GET STARRED REPO AND SEARCH STARRED REPO -----
  static getStarredRepo(req, res) {
    ax
      .get(`/users/${req.params.username}/starred`)
      .then(({ data }) => {
        if(!req.query.search) {
          res.status(200).json(data)
        } else {
            data.forEach(repo => {
              if(repo.name == req.query.search) {
                res.status(200).json(repo)
              } 
            })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // UNSTAR A REPO
  static unstarRepo(req, res) {
    ax
    .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
    .then(({ data }) => {
      res.status(204).json(data)
    })
    .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // SEE OTHER USER REPOS
  static seeOthersRepo(req, res) {
    ax
      .get(`/users/${req.body.username}/repos`)
      .then(({ data }) => {
        // console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {

        res.status(500).json(err.message)
      })
  }


}

module.exports = UserController