
import Todo from "../models/Todo.model.js";
Todo
export const resolvers = {
  Query: {
    getAllTodos: async () => {
      try {
        const todos = await Todo.find({});
        return {
          status: true,
          message: "Todos fetched successfully!",
          data: todos
        };
      } catch (error) {
        throw "An error ocurred!";
      }
    },

    getSingleTodo: async (_, props) => {
      try {
        const { id } = props;
        const todo = await Todo.findOne({ _id: id });
        if (!todo) {
          return {
            status: false,
            message: "Todo not found!",
            data: todo
          };
        }
        return {
          status: true,
          message: "Todo fetched successfully!",
          data: todo
        };
      } catch (error) {
        return "An error ocurred!";
      }
    }
  },

  Mutation: {
    createTodo: async (_, props) => {
      try {
        const { title, description } = props.newTodo;

        await Todo.create({
          title,
          description,
        });
        return {
          status: true,
          message: "Todo was created successfully!"
        };
      } catch (error) {
        console.log("Could not create todo", { error });
      }
    },
    updateTodo: async (_, props) => {

      try {
        const { update } = props
        const todo = await Todo.findOneAndUpdate({ _id: update.id }, {
          ...update
        }, {
          new: true
        });

        return {
          status: true,
          message: "Todo data updated successfully",
          data: todo
        };
      } catch (error) {
        return `Could not update Todo data", ${ error }`;
      }
    },

    deleteTodo: async (_, props) => {
      try {
        await Todo.findByIdAndDelete({ _id: props.id });
        return {
          status: true,
          message: "Todo data deleted!"
        };
      } catch (error) {
        return "Could not delete todo data";
      }
    }
  }
};
