/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Get all users data success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "New Category"
 *                     age:
 *                       type: integer
 *                       example: 20
 *                     email:
 *                       type: string
 *                       example: "users@email.com"
 *                 message:
 *                   type: string
 *                   example: "Create Category Data Success"
 *       404:
 *         description: Category Is Empty
 *       500:
 *         description: Internal Server Error
 */