// handleImageChange.test.js
import { jest } from '@jest/globals';
import handleImageChange from '/workspaces/project-automated-plant-caregiver/plantparent/src/components/Plant.js';

describe("handleImageChange", () => {
    let setPlantImageMock, eMock, localStorageMock, fileReaderMock, readerOnLoad;

    beforeEach(() => {
        // Mock setPlantImage
        setPlantImageMock = jest.fn();

        // Mock FileReader
        readerOnLoad = null;
        fileReaderMock = {
            readAsDataURL: jest.fn(),
            onload: null,
            result: "mockBase64Image",
        };
        fileReaderMock.readAsDataURL.mockImplementation(() => {
            readerOnLoad(); // Simulate the onload callback
        });
        window.FileReader = jest.fn(() => fileReaderMock);

        // Mock localStorage
        localStorageMock = (() => {
            let store = {};
            return {
                getItem: jest.fn((key) => store[key] || null),
                setItem: jest.fn((key, value) => {
                    store[key] = value;
                }),
                clear: jest.fn(() => {
                    store = {};
                }),
            };
        })();
        Object.defineProperty(window, "localStorage", { value: localStorageMock });

        // Mock event
        eMock = {
            target: {
                files: [
                    {
                        name: "test.jpg",
                    },
                ],
            },
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set the plant image and update localStorage", () => {
        // Function to test
        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageUrl = reader.result;
                    setPlantImageMock(imageUrl);

                    // Save the new image to localStorage
                    const storedPlants = JSON.parse(localStorage.getItem("plants")) || {};
                    storedPlants["123"] = {
                        name: "Test Plant",
                        image: imageUrl,
                    };
                    localStorage.setItem("plants", JSON.stringify(storedPlants));
                };
                reader.readAsDataURL(file);
            }
        };

        // Mock plantName and plantId
        const plantName = "Test Plant";
        const plantId = "123";

        // Set up mock behavior
        readerOnLoad = fileReaderMock.onload;

        // Call function
        handleImageChange(eMock);

        // Validate FileReader is used
        expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(eMock.target.files[0]);

        // Simulate FileReader onload
        readerOnLoad();

        // Validate setPlantImage is called
        expect(setPlantImageMock).toHaveBeenCalledWith("mockBase64Image");

        // Validate localStorage update
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            "plants",
            JSON.stringify({
                "123": {
                    name: "Test Plant",
                    image: "mockBase64Image",
                },
            })
        );
    });
});

describe('PlantWateringApp', () => {
    let setCurrentDateMock, setSelectedDaysMock;

    beforeEach(() => {
        setCurrentDateMock = jest.fn();
        setSelectedDaysMock = jest.fn();
        jest.spyOn(React, 'useState').mockImplementation((init) => [init, setCurrentDateMock]);
        jest.spyOn(React, 'useState').mockImplementationOnce((init) => [init, setSelectedDaysMock]);
    });

    it('should calculate the correct week start and week days', () => {
        const currentDate = new Date(2024, 11, 7); // Example date (Saturday, Dec 7, 2024)
        const expectedWeekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const expectedWeekDays = Array.from({ length: 7 }, (_, i) => addDays(expectedWeekStart, i));

        render(<PlantWateringApp />);

        // You can assert the values based on `weekStart` and `weekDays`
        expect(weekStart).toEqual(expectedWeekStart);
        expect(weekDays).toEqual(expectedWeekDays);
    });

    it('should go to the previous week when "Previous Week" button is clicked', () => {
        const initialDate = new Date(2024, 11, 7);
        render(<PlantWateringApp />);

        fireEvent.click(screen.getByText('Previous Week'));

        expect(setCurrentDateMock).toHaveBeenCalledWith(subDays(initialDate, 7));
    });

    it('should go to the next week when "Next Week" button is clicked', () => {
        const initialDate = new Date(2024, 11, 7);
        render(<PlantWateringApp />);

        fireEvent.click(screen.getByText('Next Week'));

        expect(setCurrentDateMock).toHaveBeenCalledWith(addDays(initialDate, 7));
    });

    it('should toggle the water status for a day when its button is clicked', () => {
        const sampleDay = new Date(2024, 11, 7);
        const dayKey = format(sampleDay, 'yyyy-MM-dd');

        render(<PlantWateringApp />);

        // First click (Water should be set to true)
        fireEvent.click(screen.getByText('Saturday, Dec 07'));
        expect(setSelectedDaysMock).toHaveBeenCalledWith(expect.objectContaining({
            [dayKey]: { water: true },
        }));

        // Second click (Water should be set to false)
        fireEvent.click(screen.getByText('Saturday, Dec 07'));
        expect(setSelectedDaysMock).toHaveBeenCalledWith(expect.objectContaining({
            [dayKey]: { water: false },
        }));

        // Test removing empty day
        fireEvent.click(screen.getByText('Saturday, Dec 07'));
        expect(setSelectedDaysMock).toHaveBeenCalledWith(expect.objectContaining({
            [dayKey]: undefined,
        }));
    });
});