import { MealEntryType } from "@/core/components/ui/home-section";
import { useMealStore } from "@/core/store/meals.store";
import { useCallback, useState } from "react";

export function useNewMeal() {
  const { addMeal } = useMealStore();

  // MEAL INFO
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const [description, setDescription] = useState("");
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const mealtypes: MealEntryType[] = [
    "BREAKFAST",
    "LUNCH",
    "SNACK",
    "DINNER",
    "OTHER",
  ];

  const [selectedMealType, setSelectedMealType] =
    useState<MealEntryType | null>(null);
  const [isMealTypeFocused, setIsMealTypeFocused] = useState(false);
  const [selectedMealTypeError, setSelectedMealTypeError] = useState<
    string | null
  >(null);

  const getMealTypeTitle = (type: MealEntryType) => {
    let mealSection: string;

    switch (type) {
      case "BREAKFAST":
        mealSection = "CAFÉ DA MANHÃ";
        break;
      case "LUNCH":
        mealSection = "ALMOÇO";
        break;
      case "DINNER":
        mealSection = "JANTAR";
        break;
      case "SNACK":
        mealSection = "LANCHE";
        break;
      default:
        mealSection = "OUTRO";
        break;
    }

    return mealSection;
  };

  const validateMealInfo = useCallback(() => {
    const isTitleValid = title.trim() !== "";
    const isTypeValid = selectedMealType !== null;

    setTitleError(isTitleValid ? null : "O nome é inválido.");
    setSelectedMealTypeError(isTypeValid ? null : "O tipo é obrigatório.");

    console.log(isTitleValid && isTypeValid);

    return isTitleValid && isTypeValid;
  }, [title, selectedMealType]);

  // MEAL CAMERA
  const [imageUri, setImageUri] = useState<string | null>(null);

  // MEAL INGREDIENTS
  const [inputText, setInputText] = useState<string>("");
  const [isInputTextFocused, setIsInputTextFocused] = useState<boolean>(false);
  const onChangeText = (value: string) => setInputText(value);

  const [ingredients, setIngredients] = useState<string[]>([]);

  const addToList = (ingredient: string) => {
    if (ingredient.trim() === "" || !checkDuplicate(ingredient)) return;
    setIngredients((prev) => [...prev, ingredient]);
  };

  const checkDuplicate = (ingredient: string) => {
    const query = ingredients.find((i) => i === ingredient);
    if (query) return false;
    return true;
  };

  const removeFromList = (ingredient: string) =>
    setIngredients((prev) => prev.filter((i) => i !== ingredient));

  const saveMeal = async () => {
    const result = await addMeal(
      {
        title,
        description,
        mealType: selectedMealType!,
        imageUri: imageUri ?? undefined,
      },
      ingredients,
    );

    if (result.success) {
      console.log("Meal saved successfully!");
    }

    return result;
  };

  return {
    title: {
      value: title,
      setValue: setTitle,
      isFocused: isTitleFocused,
      setFocused: setIsTitleFocused,
      error: titleError,
    },
    description: {
      value: description,
      setValue: setDescription,
      isFocused: isDescriptionFocused,
      setFocused: setIsDescriptionFocused,
    },
    mealtype: {
      list: mealtypes,
      selectedMealType: selectedMealType,
      setSelectedMealType: setSelectedMealType,
      isFocused: isMealTypeFocused,
      setFocused: setIsMealTypeFocused,
      error: selectedMealTypeError,
    },
    getMealTypeTitle,
    validateMealInfo,
    imageUri: {
      value: imageUri,
      setValue: setImageUri,
    },
    inputText: {
      value: inputText,
      onChangeText: onChangeText,
      isFocused: isInputTextFocused,
      setFocused: setIsInputTextFocused,
    },
    ingredients: {
      list: ingredients,
      add: (ingredient: string) => addToList(ingredient),
      remove: (ingredient: string) => removeFromList(ingredient),
      checkDuplicate: (ingredient: string) => checkDuplicate(ingredient),
    },
    saveMeal
  };
}
