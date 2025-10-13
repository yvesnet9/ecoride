// 🌿 models/User.js – Modèle utilisateur EcoRide
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) =>
          `${props.value} n'est pas une adresse email valide.`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    ecoPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 🔒 Hash du mot de passe avant sauvegarde
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Comparer les mots de passe
UserSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

// 🚫 Masquer le mot de passe dans les réponses JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// 🏅 Bonus : badge écologique virtuel
UserSchema.virtual("ecoBadge").get(function () {
  if (this.ecoPoints > 1000) return "🌍 Élite écoresponsable";
  if (this.ecoPoints > 500) return "💚 Explorateur vert";
  return "🌱 Débutant vert";
});

export default mongoose.model("User", UserSchema);
