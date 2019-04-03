const router =  require('express').Router()
const userController = require('../controllers/users')

router.get('/', userController.getRepos)
router.post('/', userController.createRepo)
router.delete('/:owner/:repoName', userController.deleteRepo)
router.get('/:username/starred', userController.getStarredRepo)
router.delete('/starred/:owner/:repo', userController.unstarRepo)
router.post('/repos', userController.seeOthersRepo)

module.exports = router