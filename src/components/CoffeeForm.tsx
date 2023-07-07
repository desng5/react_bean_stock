import { FormEvent, ChangeEvent, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CoffeeType } from "../types/coffee";
import { roasters, coffee_types } from "../assets/options";
import {
  CheckIcon,
  ChevronUpDownIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import { Rating } from "@mui/material";

type CoffeeFormProps = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleRatingChange: (value: number) => void;
  newCoffee: CoffeeType;
};

export const CoffeeForm = ({
  handleSubmit,
  handleChange,
  handleRatingChange,
  newCoffee,
}: CoffeeFormProps) => {
  const [selectedRoaster, setSelectedRoaster] = useState(newCoffee.roaster);
  const [selectedCoffeeType, setSelectedCoffeeType] = useState(
    newCoffee.coffee_type
  );

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleCoffeeTypeChange = (selectedCoffeeType: string) => {
    setSelectedCoffeeType(selectedCoffeeType);
    handleChange({
      target: {
        name: "coffee_type",
        value: selectedCoffeeType,
      },
    } as ChangeEvent<HTMLInputElement>);
  };
  const handleRoasterChange = (selectedRoaster: string) => {
    setSelectedRoaster(selectedRoaster);
    handleChange({
      target: {
        name: "roaster",
        value: selectedRoaster,
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-[45%] bg-amber-900 px-32 py-10">
      <form
        className="grid w-2/3 snap-center gap-y-2 rounded-full bg-amber-950 p-10"
        onSubmit={handleSubmit}
      >
        <label className="text-amber-400">Name</label>
        <input
          className="w-full rounded-md px-4 py-1 text-lg"
          name="name"
          value={newCoffee.name}
          onChange={handleChange}
          type="text"
        />
        <label className="text-amber-400">Coffee Type</label>
        <Listbox value={selectedCoffeeType} onChange={handleCoffeeTypeChange}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative h-9 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                <span className="block truncate">{selectedCoffeeType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {coffee_types.map((coffeeType, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={coffeeType}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {coffeeType}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <CheckIcon
                                className="h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <label className="flex items-center text-amber-400">
          <CurrencyDollarIcon className="mr-1 h-6 w-6 text-[var(--text-color)]" />
          Price
        </label>
        <input
          className="w-full rounded-md px-4 py-1 text-lg"
          name="price"
          value={newCoffee.price}
          onChange={handleChange}
          type="text"
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
        />
        <label className="text-amber-400">
          Description
          <textarea
            className="w-full rounded-md px-4 py-1 text-lg text-amber-950"
            name="description"
            value={newCoffee.description}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <label className="text-amber-400">Brew Method</label>
        <input
          className="w-full rounded-md px-4 py-1 text-lg"
          name="brew_method"
          value={newCoffee.brew_method}
          onChange={handleChange}
          type="text"
        />
        <label className="text-amber-400">Roaster</label>
        <Listbox value={selectedRoaster} onChange={handleRoasterChange}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative h-9 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                <span className="block truncate">{selectedRoaster}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {roasters.map((roaster, roasterIdx) => (
                    <Listbox.Option
                      key={roasterIdx}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={roaster}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {roaster}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <CheckIcon
                                className="h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <label className="text-amber-400">Rating</label>
        <Rating
          className="place-self-center"
          name="rating"
          defaultValue={0}
          value={Number(newCoffee.rating)}
          precision={0.5}
          onChange={(_, newValue) => {
            handleRatingChange(newValue as number);
          }}
        />
        <button
          className="-pt-48 fixed -bottom-56 left-96 right-96 scale-75 rounded-[50%] bg-yellow-100 py-48 text-5xl hover:motion-safe:animate-bounce"
          style={{ clipPath: "polygon(0 30%, 100% 30%, 70% 100%, 30% 100%)" }}
          type="submit"
        >
          Start Brewing!
        </button>
      </form>
    </div>
  );
};