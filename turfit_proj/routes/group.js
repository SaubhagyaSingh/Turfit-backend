const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Turf, Group, Academy, Sport, History, User } = require('../models');

app.use(express.json());

// Get all groups
app.get('/group', async (req, res) => {
  try {
    const groups = await Group.find();
    if (groups.length === 0) {
      return res.status(404).json({ error: 'No groups found' });
    }
    res.status(200).json({ message: 'Groups retrieved successfully', groups });
  } catch (error) {
    console.error('Error retrieving groups:', error);
    res.status(500).json({ error: 'Internal server error while retrieving groups' });
  }
});

// Get group by name
app.get('/group/:groupname', async (req, res) => {
  try {
    const group = await Group.findOne({ groupname: req.params.groupname });
    if (!group) {
      return res.status(404).json({ error: `Group with name ${req.params.groupname} not found` });
    }
    res.status(200).json({ message: 'Group retrieved successfully', group });
  } catch (error) {
    console.error('Error finding group:', error);
    res.status(500).json({ error: 'Internal server error while retrieving group' });
  }
});

// Delete group by name
app.delete('/group/:groupname', async (req, res) => {
  try {
    const result = await Group.deleteOne({ groupname: req.params.groupname });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: `Group with name ${req.params.groupname} does not exist` });
    }
    res.status(200).json({ message: 'Group deleted successfully', result });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal server error while deleting group' });
  }
});

// Insert new group
app.post('/groups', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.groupname || !req.body.members || !req.body.createdAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existinggroup = await Group.findOne({ groupname: req.body.groupname });
    if (existinggroup) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    const newgroup = new Group({
      groupname: req.body.groupname,
      members: req.body.members,
      createdAt: req.body.createdAt,
    });

    const savedgroup = await newgroup.save();
    res.status(201).json({ message: 'Group created successfully', savedgroup });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error while creating group' });
  }
});

module.exports = app;
