const { error } = require('console');
const { User } = require('../models');
const { signToken, authMiddleware } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw error;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw error;
            }

            const token = signToken(user);
            return { token, user};
        }
    }
}