import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, paramsSchema, querySchema } from '../validators/group.validator';
import { GroupCtrl } from '../controllers';

const router = express.Router();
const validator = createValidator({});

router.get('/', GroupCtrl.getAllGroups);
router.get('/:id', validator.params(paramsSchema), GroupCtrl.getGroup);
router.post('/', validator.body(bodySchema), GroupCtrl.addNewGroup);
router.delete('/:id', validator.params(paramsSchema), GroupCtrl.removeGroup);
router.put('/:id/', validator.body(bodySchema), validator.params(paramsSchema), GroupCtrl.updateGroup);
router.put('/:id/addUser', validator.params(paramsSchema), validator.query(querySchema), GroupCtrl.addUsersToGroup);

export default router;
