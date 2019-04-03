// GET ALL REPOS 
function getRepos() {
  // console.log('masuk')
  $.ajax({
    url: 'http://localhost:3000/users',
    method: 'GET',
  })
  .done(function(response) {
    // console.log(response)
    let html = ''
    response.forEach(e => {
      html += `<p>${e.name}</p>`
    })
    $('#my-repos').html(html)
  })
  .fail(function(jqXHR, textStatus) {
    console.log('request failed', textStatus)
  })
}

// CREATE NEW REPO
function createRepo() {
  event.preventDefault()
  let repoName = $('#create-new-repo').val()
  console.log(repoName)
  $.ajax({
    url: 'http://localhost:3000/users',
    method: 'POST',
    data: { 
      repoName: repoName
     }
  })
  .done(function(response) {
    // $('#create-repo').prepend(`${response}`)
  })
  .fail(function(jqXHR, textStatus) {
    console.log('request failed', textStatus)
  })
}

// STILL FIGURING OUT HOW TO IMPLEMENT
// function deleteRepo() {
//   $.ajax({
//     url: 'http://localhost:3000/users/:owner/:repoName',
//     method: 'DELETE'
//   })
//   .done(function(response) {

//   })
//   .fail(function(jqXHR, textStatus) {
//     console.log('request failed', textStatus)
//   })
// }

// GET STARRED REPO AND SEARCH REPO 
function getStarredRepo() {
  $.ajax({
    url: 'http://localhost:3000/users/Hermsz/starred',
    method: 'GET',
  })
  .done(function(response) {
    let html = ``
    response.forEach(e => {
      html += `<p>${e.name}</p>`
    })
    $('#starred-repos').empty()
    $('#starred-repos').html(html)
  })
  .fail(function(jqXHR, textStatus) {
    console.log('request failed', textStatus)
  })
}

function unstarRepo() {

  let owner = $('#unstar-owner').val()
  let repo = $('#unstar-repo').val()

  $.ajax({
    url: `http://localhost:3000/users/starred/${owner}/${repo}`,
    method: 'DELETE'
  })
  .done(function(response) {

  })
  .fail(function(jqXHR, textStatus) {
    console.log('request failed', textStatus)
  })
}

// SEE OTHERS REPO
function seeOthersRepo() {
  event.preventDefault()
  let username = $('#username').val()
  // console.log(username)
  $.ajax({
    data: {
      username: username
    },
    url: `http://localhost:3000/users/repos`,
    method: 'POST'
  })
  .done(function(response) {
    let html = ``
    response.forEach(e => {
      html += `<p>${e.name}</p>`
    })
    $('#found-repo').empty()
    $('#found-repo').append(html)

  })
  .fail(function(jqXHR, textStatus) {
    console.log('request failed', textStatus)
  })
}

$(document).ready(function() {

  getRepos()
  $('#create-repo-form').submit(function() {
    createRepo()
  })
  getStarredRepo()
  unstarRepo()



})
