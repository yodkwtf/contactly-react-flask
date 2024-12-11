import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { BASE_URL } from '../config/constants';
import validateContactForm from '../utils/contactValidation';

const AddContactModal = ({ setContacts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occupation: '',
    address: '',
    gender: '',
  });

  const toast = useToast();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      // TODO: add API URL as a constant
      const res = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // TODO: Handle error based on data return from backend
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      toast({
        title: 'Contact added.',
        description: 'Contact created successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
      onClose();

      // add contact to the list
      setContacts((prevContacts) => [data.data.contact, ...prevContacts]);

      // clear the form data
      setFormData({
        name: '',
        phone: '',
        occupation: '',
        address: '',
        gender: '',
      });
    } catch (err) {
      toast({
        title: 'An error occurred.',
        description: err.message,
        status: 'error',
        duration: 4000,
        position: 'top-center',
        isClosable: true,
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="outline" mr={4}>
        Add Contact
        <BiAddToQueue style={{ marginLeft: '8px' }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>New Contact</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.phone} mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="9991119119"
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.occupation} mt={4}>
                <FormLabel>Occupation</FormLabel>
                <Input
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  placeholder="Detective"
                />
                <FormErrorMessage>{errors.occupation}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.address} mt={4}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Gotham City"
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.gender} mt={4}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio
                      value="male"
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      Male
                    </Radio>
                    <Radio
                      value="female"
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      Female
                    </Radio>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} border={true} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default AddContactModal;
