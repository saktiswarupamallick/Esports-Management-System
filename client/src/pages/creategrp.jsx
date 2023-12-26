import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


const GroupForm = ({
  group,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {

  const handleAddPlayer = () => {
    setPlayers([...players, { playerName: '', position: '' }]);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <h2>Create Group</h2>
      </Grid>
      <Grid item>
        <form onSubmit={saveProduct}>

          <Grid container spacing={2}>
            <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
            <Input
              id="image-upload"
              name="image"
              onChange={(e) => handleImageChange(e)}
              type="file"
              inputProps={{ accept: 'image/*' }}
            />
            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
            <Grid item xs={12}>
              <TextField
                label="Group Name"
                value={group?.name}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="Group Description"
                rowsMin={3}
                placeholder="Group Description"
                value={description}
                onChange={setDescription}
                required
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={2}>
                {players.map((player, index) => (
                  <Grid item key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Player Name"
                          value={player.playerName}
                          onChange={(e) => handlePlayerChange(index, 'playerName', e.target.value)}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Position"
                          value={player.position}
                          onChange={(e) => handlePlayerChange(index, 'position', e.target.value)}
                          required
                          fullWidth
                        />
                      </Grid>
                      {index > 0 && (
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemovePlayer(index)}
                            fullWidth
                          >
                            Remove
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleAddPlayer} fullWidth>
                Add Player
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Group
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default GroupForm;
